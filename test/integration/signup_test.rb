require 'test_helper'

class SignupTest < ActionDispatch::IntegrationTest

  def test_sign_up_works_on_home_page
    visit(root_path)
    assert page.current_path == root_path
    click_link('Sign Up')
    fill_in('First Name', with: 'Lydia')
    fill_in('Last Name', with: 'Trout')
    fill_in('sign_up_email', with: 'ltrout@gmail.com')
    fill_in('Date of Birth', with: '11-04-1955')
    fill_in('Password', with: 'playground')
    fill_in('Confirm Password', with: 'playground')
    click_button('btn_sign_up')
    assert page.current_path == current_user_dashboard_path
    refute page.has_content?('Login')
    assert page.has_selector?('a[href="/logout"]')
    assert_equal 'Lydia', User.first.name
    assert_equal 'ltrout@gmail.com', User.first.email
  end
end
