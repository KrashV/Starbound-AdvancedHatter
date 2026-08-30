function patch(config)
    if assets.scan then
        config.hats = assets.scan("/animatedhats", ".json")
    end

    return config
end