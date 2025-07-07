function init()

  self.previousEmote = "idle"
  self.previousPosition = world.entityPosition(player.id())
  self.previousDirection = "none"
  
	local hairGroups = {
		human = {
			hairType = "male54",
			facialHairType = "male54",
			facialHairGroup = "hair"
		},
		floran = {
			hairType = "11",
			facialHairType = "11",
			facialHairGroup = "hair"
		},
		hylotl = {
			hairType = "20",
			facialHairType = "20",
			facialHairGroup = "hair"
		},
		avian = {
			hairType = "20",
			facialHairType = "1",
			facialHairGroup = "fluff"
		},
		glitch = {
			hairType = "0",
			facialHairType = "0",
			facialHairGroup = "hair"
		},
		apex = {
			hairType = "1",
			facialHairType = "1",
			facialHairGroup = "beardmale"
		},
		novakid = {
			hairType = "male0",
			facialHairType = "0",
			facialHairGroup = "brand"
		}
	}

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
	local species = player.species()

	local head = player.getProperty("animatedHead")
	self.mode = _ENV["player"]["setFacialHairType"] and "StarExtentions" or _ENV["_star_player"] and "hasiboundlite" or nil
	self.innerHead = head and self.mode and root.assetJson("/animatedhats/" .. head .. ".json") or nil

	if self.innerHead and hairGroups[species] then
		if self.mode == "hasiboundlite" then
			_star_player():set_hair_type(hairGroups[species].hairType)
			_star_player():set_facialHair_group(hairGroups[species].facialHairGroup)
			_star_player():set_facialHair_type(hairGroups[species].facialHairType)
		elseif self.mode == "StarExtentions" then
			player.setHairType(hairGroups[species].hairType)
			player.setFacialHairGroup(hairGroups[species].facialHairGroup)
			player.setFacialHairType(hairGroups[species].facialHairType)
		end
	end
end


function update(dt)	
	-- Retrieve current parameters --
	
	local mode, slotName, currentHat = getHeadItem()
	
	if currentHat and currentHat.parameters.advancedHatter then
		local currentEmoteFrame = getEmote()
		local currentEmote = currentEmoteFrame:match("[^%d%W]+")
		local currentDirection = mcontroller.facingDirection()
		local currentDirectionName = currentDirection > 0 and "default" or "reverse"
  
		local parms = currentHat.parameters.advancedHatter

		if currentDirection ~= self.previousDirection or currentEmoteFrame ~= self.previousEmote then
			local directives = getFrame(parms, currentDirection, currentEmoteFrame)

			if directives then
				if mode == "hasiboundlite" then
					_star_player():set_facialHair_directives(directives)
				elseif mode == "StarExtentions" then
					player.setFacialHairDirectives(directives)
				else
					currentHat.parameters.directives = directives
					player.setEquippedItem(slotName, currentHat)
				end
			end

			self.previousEmote = currentEmoteFrame
			self.previousDirection = currentDirection
		end
	end
end

function getVersion(parms)
	return parms.version or 1
end

function getHeadItem(parms)
	local slotName = "headCosmetic"
	local currentHat = player.equippedItem(slotName)
	
	if not currentHat or not currentHat.parameters.advancedHatter then
		slotName = "head"
		currentHat = player.equippedItem(slotName)
	end

	if not currentHat or not currentHat.parameters.advancedHatter then 
		if self.innerHead then return self.mode, _, self.innerHead end
	else
		return "item", slotName, currentHat
	end
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

function getFrame(parms, direction, emoteFrame)
	local directives = ""
	local currentDirectionName = direction > 0 and "default" or "reverse"
	local otherDirectionName = direction <= 0 and "default" or "reverse"
	
	-- Check for aliases
	if self.aliases[emoteFrame] then
		emoteFrame = self.aliases[emoteFrame]
	end
	
	local emote = emoteFrame:match("[^%d%W]+")
	local frame = tonumber(emoteFrame:match("%d+"))
	
	-- Bugfix
	if not frame then frame = 1 end

	if getVersion(parms) == 2 then
		if not parms.reverse then
			currentDirectionName = "default"
		end

		if not parms[currentDirectionName][self.emotes[emote]] then 
			if parms[currentDirectionName][self.emotes["idle"]] then
				emote = "idle"
			else
				return nil
			end		
		end

		frame = math.min(frame, #parms[currentDirectionName][self.emotes[emote]])

		directives = parms[currentDirectionName][self.emotes[emote]][frame]
	else --previous version
		if not parms[self.emotes[emote]] then return nil end
		frame = math.min(frame, #parms[self.emotes[emote]])

		if type(parms[self.emotes[emote]][frame]) == "table" then
			if direction > 0 then
				directives = parms[self.emotes[emote]][frame].default
			else
				directives = parms[self.emotes[emote]][frame].reverse
			end
		else
			directives = parms[self.emotes[emote]][frame]
		end
	end

	return directives
end
