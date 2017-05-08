class GeojsonBuilder
  def build_step(step, geojson)
    geojson << {
        type: "Feature",
        geometry: {
            type: "Point",
            coordinates: [step.longitude, step.latitude]
        },
        properties: {
            place: step.place,
            :"marker-color" => "#FFFFFF",
            :"marker-symbol" => "circle"
        }
    }
  end
end