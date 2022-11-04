function init()

  self.previousEmote = "idle"
  self.previousPosition = world.entityPosition(player.id())
  self.previousDirection = "none"
  
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


function update(dt)	
	-- Retrieve current parameters --
	local currentEmoteFrame = getEmote()
	local currentEmote = currentEmoteFrame:match("[^%d%W]+")
	local currentDirection = mcontroller.facingDirection()
	local currentDirectionName = currentDirection > 0 and "default" or "reverse"
	
	self.slotName, self.currentHat = getHeadItem()
	
	if self.currentHat and self.currentHat.parameters.advancedHatter then
		if getVersion() == 2 then
			if not self.currentHat.parameters.advancedHatter[currentDirectionName][self.emotes[currentEmote]] then currentEmote = "idle" currentEmoteFrame = "idle" end
		else -- support previous version
			if not self.currentHat.parameters.advancedHatter[self.emotes[currentEmote]] then currentEmote = "idle" currentEmoteFrame = "idle" end
		end

		if currentDirection ~= self.previousDirection or currentEmoteFrame ~= self.previousEmote then
			self.currentHat.parameters.directives = getFrame(currentDirection, currentEmoteFrame)
			player.setEquippedItem(self.slotName, self.currentHat)

			self.previousEmote = currentEmoteFrame
			self.previousDirection = currentDirection
		end
	end
end

function getVersion()
	return self.currentHat.parameters.advancedHatter.version and self.currentHat.parameters.advancedHatter.version or 1
end

function getHeadItem()
	local slotName = "headCosmetic"
	local currentHat = player.equippedItem(slotName)
	
	if not currentHat then
		slotName = "head"
		currentHat = player.equippedItem(slotName)
	end
	return slotName, currentHat
end

function getEmote()
	local portrait = world.entityPortrait(player.id(), "head")
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
	local currentDirectionName = direction > 0 and "default" or "reverse"
	
	-- Check for aliases
	if self.aliases[emoteFrame] then
		emoteFrame = self.aliases[emoteFrame]
	end
	
	local emote = emoteFrame:match("[^%d%W]+")
	local frame = tonumber(emoteFrame:match("%d+"))
	
	-- Bugfix
	if not frame then frame = 1 end
	
	-- Out of border check
	if getVersion() == 2 then
		frame = math.min(frame, #self.currentHat.parameters.advancedHatter[currentDirectionName][self.emotes[emote]])

		if type(self.currentHat.parameters.advancedHatter[currentDirectionName][self.emotes[emote]][frame]) == "table" then
			directives = self.currentHat.parameters.advancedHatter[currentDirectionName][self.emotes[emote]][frame]
		else
			directives = self.currentHat.parameters.advancedHatter[currentDirectionName][self.emotes[emote]][frame]
		end
	else --previous version
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
	end

	return directives
end
