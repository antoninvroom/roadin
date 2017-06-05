desc "delete all record in advises in step"

task :delete_advises => :environment do 
  @steps = Step.all
  @steps.each do |step|
    step.advises.clear
    step.save
  end
end