module.exports = {
    confirm: email => `Message sent to ${email}, please check your inbox to confirm!`,
    confirmed: () => 'Your email is confirmed, auth completed!',
    resend: email => `Confirmation email resent to ${email}, maybe check your spam?`,
    notFound: () => 'User with that Email is not found!',
    alreadyConfirmed: () => 'Your email was already confirmed'
  }