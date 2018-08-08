local oldControllerInit = init

init = function()
	if oldControllerInit then oldControllerInit() end
	
	message.setHandler("getActorDirection", function(_, isLocal)
		if isLocal then
			return mcontroller.facingDirection()
		end
	end)
end