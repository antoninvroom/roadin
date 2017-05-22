desc "get all cities, countries and states in DB"

task :get_all_countries => :environment do

	puts "- start iterating"
	CS.countries.each do |code, name|
		puts "code : #{code}, name: #{name}"
		Country.create!(name: name, code: code, flag: "flag-icon-#{code.downcase}")
		puts "ok create"
	end
	puts "- end iterating | close task "
end