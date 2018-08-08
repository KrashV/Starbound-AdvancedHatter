local oldHatterInit = init
local oldHatterUpdate = update
local oldHatterUninit = uninit

init = function()
  if oldHatterInit then oldHatterInit() end
  
  self.previousEmote = "idle"
  self.previousPosition = entity.position()
  self.previousDirection = 1
  
  self.slotName = "headCosmetic"
  
  self.emotes = {
	idle = "idle",
	blink = "blink",
	wink = "wink",
	happy = "happy",
	sleep = "blink",
	sad = "sad",
	blabber = "blabber",
	shout = "shout",
	neutral = "neutral",
	annoyed = "annoyed",
	laugh = "laugh",
	oh = "surprised",
	oooh = "shocked",
	eat = "shout"
  }
  
  self.aliases = root.assetJson("/humanoid/emote.frames").aliases
end

update = function(dt)
	if oldHatterUpdate then oldHatterUpdate(dt) end
	
	-- Retrieve current parameters --
	local currentEmoteFrame = getEmote()
	local currentEmote = currentEmoteFrame:match("[^%d%W]+")
	local currentDirection = world.sendEntityMessage(entity.id(), "getActorDirection"):result()
	
	self.slotName = "headCosmetic"
	self.currentHat = player.equippedItem(self.slotName)
	
	if not self.currentHat then
		self.slotName = "head"
		self.currentHat = player.equippedItem(self.slotName)
	end
	
	if self.currentHat and self.currentHat.parameters.advancedHatter and self.currentHat.parameters.advancedHatter[self.emotes[currentEmote]] then
		if currentDirection ~= self.previousDirection or currentEmoteFrame ~= self.previousEmote then
			self.currentHat.parameters.directives = getFrame(currentDirection, currentEmoteFrame)
			player.setEquippedItem(self.slotName, self.currentHat)
			
			self.previousEmote = currentEmoteFrame
			self.previousDirection = currentDirection
		end
	end
	
	sb.setLogMap("Emote", currentEmoteFrame)
end

uninit = function()
	if oldHatterUninit then oldHatterUninit() end

end

function getEmote()
	local portrait = world.entityPortrait(entity.id(), "head")
	local emote = "idle"
	for _, v in pairs(portrait) do
		if string.find(v.image, "/emote.png") then
			emote = string.match(v.image, "%/humanoid%/%w+%/emote.png:%w+%.+%d+"):gsub("%/humanoid%/%w+%/emote.png:", "")
			break
		end
	end
	
	return emote
end

function getFrame(direction, emoteFrame)
	local directives = ""
	
	-- Check for aliases
	if self.aliases[emoteFrame] then
		emoteFrame = self.aliases[emoteFrame]
	end
	
	local emote = emoteFrame:match("[^%d%W]+")
	local frame = tonumber(emoteFrame:match("%d+"))
	
	-- Bugfix
	if not frame then frame = 1 end
	
	-- Out of border check
	frame = math.min(frame, #self.currentHat.parameters.advancedHatter[self.emotes[emote]])
	
	if type(self.currentHat.parameters.advancedHatter[self.emotes[emote]][frame]) == "table" then
		if direction > 0 then
			directives = self.currentHat.parameters.advancedHatter[self.emotes[emote]][frame].default
		else
			directives = self.currentHat.parameters.advancedHatter[self.emotes[emote]][frame].reverse
		end
	else
		directives = self.currentHat.parameters.advancedHatter[self.emotes[emote]][frame]
	end

	return directives
end
