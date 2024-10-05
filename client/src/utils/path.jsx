const path = {
  // Public
  HOME: '/*',
  LOGIN: 'login',
  PUBLIC: 'public',
  ABOUT_US: 'about-us',
  FORGOT_PASS: 'forgot-password',
  CHANGE_PASS: 'change-password',
  OTP_INPUT: 'send-recovery-otp',

  // Common User
  USER_PROFILE_NAME_ID: 'profile-user/:name/:id',
  USER_PROFILE_NAME_ID: 'profile-user/:name/:id',
  USER_PROFILE_ALL: 'profile-user/*',
  USER_PROFILE: 'profile-user',
  LIST_GROUP: 'list-group',

  // Student
  PUBLIC_STUDENT: 'student',
  STUDENT_HOME: 'home',
  STUDENT_VIEW_MENTOR: 'view-mentor',
  STUDENT_VIEW_CLASS: 'view-class',
  STUDENT_BOOKING: 'booking',
  STUDENT_GROUP: 'group',
  STUDENT_CREATE_GROUP: 'create-group',
  STUDENT_HISTORY_POINT: 'history-point',

  // Mentor
  PUBLIC_MENTOR: 'mentor',
  MENTOR_HOME: 'home',
  MENTOR_VIEW_CLASS: 'view-class',

  // Admin
  PUBLIC_ADMIN: 'admin',
  ADMIN_HOME: 'home',
  ADMIN_USER_LIST: 'user-list'
};

export default path;
