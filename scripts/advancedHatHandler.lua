function init()

  self.OSBSupport = not not _ENV["player"]["setFacialHairType"]

	function initHead(toResetInnerDirectives)
    if toResetInnerDirectives and self.OSBSupport then
      resetInnerDirectives()
    end

		local head = player.getProperty("animatedHead")
		self.innerHead = head and self.OSBSupport and root.assetJson("/animatedhats/" .. head .. ".json") or nil
		self.animationLayer = player.getProperty("animatedHeadLayer", "FacialHair")
		self.previousEmote = player.currentEmote and self.emotes[player.currentEmote():lower()] or "idle"
		self.previousDirection = "none"
	end


  self.emotes = {
    idle = "idle",
    blink = "blink",
    wink = "wink",
    happy = "happy",
    sleep = "blink",
    sad = "sad",
    blabber = "blabber",
    blabbering = "blabber",
    shout = "shout",
    neutral = "neutral",
    annoyed = "annoyed",
    laugh = "laugh",
    oh = "surprised",
    oooh = "shocked",
    eat = "shout"
  }

  self.hatSlots = {
    "innerHead",
    "head",
    "headCosmetic"
  }

  if renderer then  --OSB check
    for i = 1, 12 do 
      table.insert(self.hatSlots, "cosmetic" .. i)
    end
  end

  -- Since emote directives are applied to a spritesheet rather than to a singular frame, we need some extra workarounds
  self.directivesStump = "?crop=0;0;1;1;?border=1;FFFFFF?scale=43;"
  self.aliases = root.assetJson("/humanoid/emote.frames").aliases


  initHead()

  message.setHandler("reset_advanced_hatter", function(_, isLocal)
    if isLocal then
      initHead(true)
    end
  end)
end


function update(dt)
	-- Retrieve current parameters --
  local currentEmoteFrame = getEmote()
  local currentEmote = currentEmoteFrame:match("[^%d%W]+")
  local currentDirection = mcontroller.facingDirection()
  local currentDirectionName = currentDirection > 0 and "default" or "reverse"

  for _, slotName in ipairs(self.hatSlots) do 
    local currentHat = getHeadItem(slotName)
    
    if currentHat and currentHat.parameters.advancedHatter then
      local parms = currentHat.parameters.advancedHatter
      if currentDirection ~= self.previousDirection or currentEmoteFrame ~= self.previousEmote then
        local directives = getFrame(parms, currentDirection, currentEmoteFrame)

        if directives then
          if slotName == "innerHead" then
			      directives = self.directivesStump .. directives

            if self.animationLayer == "FacialHair" then
              player.setFacialHairDirectives(directives)
            elseif self.animationLayer == "Emote" then
              player.setEmoteDirectives(directives)
            elseif self.animationLayer == "Hair" then
              player.setHairDirectives(directives)
            end
          else
            currentHat.parameters.directives = directives
            player.setEquippedItem(slotName, currentHat)
          end
        end
      end
    end
  end

  self.previousEmote = currentEmoteFrame
  self.previousDirection = currentDirection
end

function getVersion(parms)
	return parms.version or 1
end

function getHeadItem(slotName)
  if slotName == "innerHead" then
    if self.innerHead then return self.innerHead end
  else
    return player.equippedItem(slotName)
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
	local frame = tonumber(emoteFrame:match("%d+")) or 1

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

function resetInnerDirectives()
  local hideDirective = "?crop=0;0;0;0;"
  if player.hairDirectives():find(self.directivesStump, nil, true) then
    player.setHairDirectives(hideDirective)
  end

  if player.emoteDirectives():find(self.directivesStump, nil, true) then
    player.setEmoteDirectives(hideDirective)
  end

  if player.facialHairDirectives():find(self.directivesStump, nil, true) then
    player.setFacialHairDirectives(hideDirective)
  end
end