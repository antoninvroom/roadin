namespace :search_suggestions do
	desc "Generate search suggestions from users"
	task :index => :environment do
		SearchSuggestion.index_users
	end
end
