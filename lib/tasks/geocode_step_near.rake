desc "geocode 3 steps near current step for toolboxes"

task :geocode_step_near => :environment do 
	@steps = Step.all
	puts @steps

	def step_near(step)
		radius = 500
		@steps_near = Step.geo_near(step.coordinates).max_distance(5)
	end

	puts "- start iterating"
	@steps.each do |step|
		# 1- clear the field
		if !step.advises.nil?
			step.advises.clear
		end
		puts step.advises

		# 2- call the method
		step_near(step)
		puts "#{step.place} - #{@steps_near.count} step near"

		# 3- push values in array
		if step.advises.blank?
      @steps_near.each do |s_near|
        if s_near != step
          step.push(advises: s_near._id.to_s)
        end
      end
		end 
		puts "Results : #{@steps_near.map {|s| s._id.to_s}}"

		# 4- save the record
		step.save
	end
end