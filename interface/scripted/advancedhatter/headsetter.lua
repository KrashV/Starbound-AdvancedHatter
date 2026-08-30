require("/interface/scripted/advancedhatter/combobox/combobox.class.lua")

function init()
	widget.setText("tbxSetHead", player.getProperty("animatedHead", "") or "")

	getStoredHats()

  self.availableLayers = {"Emote", "FacialHair", "Hair"}
  self.selectedHairLayer = player.getProperty("animatedHeadLayer", "FacialHair")
  widget.setText("btnSetEmotingLayer", self.selectedHairLayer)
end

function getStoredHats()
  
  if config.getParameter("hats") then
    local hatNames = {}

    for i, hatPath in ipairs(config.getParameter("hats")) do 
      local hatName = string.match(hatPath, "/animatedhats/(%w+).json")
      if hatName then
        hatNames[hatName] = hatName
      end
    end

    self.hatsCombobox = Combobox:bind("btnOpenHatList", hatNames,
      function(data)
        widget.setText("tbxSetHead", data)
      end,
      {
        background = "/interface/scripted/advancedhatter/combobox/background.png",
        defaultValue = player.getProperty("animatedHead"),
        filter = false,
        closeOnSelect = true,
        offset = {-60, 12},
        sortKeys = true
      }
    )
    
    widget.setVisible("btnOpenHatList", true)
  end
end

function setHead()
  local name = widget.getText("tbxSetHead")
  local path = "/animatedhats/" .. name .. ".json"
  if pcall(function() root.assetJson(path) end) then
		player.setProperty("animatedHeadLayer", self.selectedHairLayer)
		player.setProperty("animatedHead", name)
    world.sendEntityMessage(player.id(), "reset_advanced_hatter")
    widget.setText("windowTitle", "^#00FF00;Head updated")
	else
		widget.setText("windowTitle", "^#ff0000;File Not Found")
	end
end

function changeLayer()
  local selectedLayer = index(self.availableLayers, widget.getText("btnSetEmotingLayer"))
  if selectedLayer then
    self.selectedHairLayer = self.availableLayers[selectedLayer % #self.availableLayers + 1]
    widget.setText("btnSetEmotingLayer", self.selectedHairLayer)
  end
end

function changeHat()
  self.hatsCombobox:toggle()
end

function index(t, value)
  for i, v in ipairs(t) do 
    if v == value then return i end
  end
end

function clearHead()
	player.setProperty("animatedHead", nil)
	widget.setText("tbxSetHead", "")
	widget.setText("windowTitle", "^#00FF00;Head cleared")
  world.sendEntityMessage(player.id(), "reset_advanced_hatter")
end