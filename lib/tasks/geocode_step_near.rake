desc "geocode 3 steps near current step for toolboxes"

task :geocode_step_near => :environment do 
	@travels = Travel.all
	puts "- start iterating"
	@travels.each do |travel|
		travel.steps.each do |step|
			# 1- clear the field
			if !step.advises.nil?
				step.advises.clear
			end
			puts step.advises

			# 2- call the method
			@step_near = Travel.where(:'steps.coordinates'.near => step.coordinates).first
			#@steps_near = Step.near(step.coordinates, 50, units: :km).limit(3)
			puts "#{step.place} - #{@steps_near.count} step near"

			# 3- push values in array
			if step.advises.blank?
				step.push(advises: @steps_near.map {|s| s._id.to_s})
			end 
			puts "Results : #{@steps_near.map {|s| s._id.to_s}}"

			# 4- save the record
			step.save
		end
	end
end