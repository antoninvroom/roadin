Rails.application.config.middleware.use OmniAuth::Builder do
  provider :facebook, '1767787890201019', '25c1d29e264d2b593c78eae417f27acf', :scope => 'user_friends'
end
