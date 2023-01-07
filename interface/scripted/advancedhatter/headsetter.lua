function init()
	widget.setText("tbxSetHead", player.getProperty("animatedHead", "") or "")
end

function setHead()
	local name = widget.getText("tbxSetHead")
  local path = "/animatedhats/" .. name .. ".json"
  if pcall(function() root.assetJson(path) end) then
		player.setProperty("animatedHead", name)
    pane.setTitle("Success", "^#00FF00;Head updated")
	else
		pane.setTitle("Warning", "^#ff0000;File Not Found")
	end
end

function clearHead()
	player.setProperty("animatedHead", nil)
	widget.setText("tbxSetHead", "")
	pane.setTitle("Success", "^#00FF00;Head cleared")
end