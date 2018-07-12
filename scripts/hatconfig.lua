local oldHatterInit = init
local oldHatterUpdate = update
local oldHatterUninit = uninit

init = function()
  if oldHatterInit then oldHatterInit() end
  
  self.previousEmote = "idle"
  self.previousPosition = entity.position()
  self.previousDirection = 1
  
  self.slotName = "headCosmetic"
  
  self.hatModes = {
	idle = "idle",
	blink = "closed",
	wink = "wink",
	happy = "happy",
	sleep = "closed",
	sad = "sad",
	blabber = "blabber",
	shout = "shout",
	neutral = "neutral",
	laugh = "laugh"
  }
end

update = function(dt)
	if oldHatterUpdate then oldHatterUpdate(dt) end
	
	-- Retrieve current parameters --
	local currentEmote = getEmote()
	local currentPosition = entity.position()
	local currentDirection = self.previousDirection
	
	if currentPosition ~= self.previousPosition then -- Yes, yet anouther dirty workaround
		local hDiff = currentPosition[1] - self.previousPosition[1] 
		
		if hDiff ~= 0 then
			currentDirection = hDiff == math.abs(hDiff) and 1 or -1
			self.previousPosition = currentPosition
		end
	end
	
	if currentDirection ~= self.previousDirection or currentEmote ~= self.previousEmote then
		self.previousEmote = currentEmote
		self.previousDirection = currentDirection
		self.currentHat = player.equippedItem(self.slotName)
		
		if not self.currentHat then
			self.slotName = "head"
			self.currentHat = player.equippedItem(self.slotName)
		end
		
		if self.currentHat and self.currentHat.parameters.advancedHatter and self.currentHat.parameters.advancedHatter[self.hatModes[currentEmote]] then
			if type(self.currentHat.parameters.advancedHatter[self.hatModes[currentEmote]]) == "table" then
				if currentDirection > 0 then
					self.currentHat.parameters.directives = self.currentHat.parameters.advancedHatter[self.hatModes[currentEmote]][1]
				else
					self.currentHat.parameters.directives = self.currentHat.parameters.advancedHatter[self.hatModes[currentEmote]][2]
				end
			else
				self.currentHat.parameters.directives = self.currentHat.parameters.advancedHatter[self.hatModes[currentEmote]]
			end
			player.setEquippedItem(self.slotName, self.currentHat)
		end
	end
end

uninit = function()
	if oldHatterUninit then oldHatterUninit() end

end

function getEmote()
	local portrait = world.entityPortrait(entity.id(), "head")
	local emote = "idle"
	for _, v in pairs(portrait) do
		if string.find(v.image, "/emote.png") then
			emote = string.match(v.image, "%:%w+%.")
			emote = string.gsub(emote, "[%:%.]", "")
			break
		end
	end
	
	return emote
end