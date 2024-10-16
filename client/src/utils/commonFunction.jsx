import dayjs from "dayjs";

export const capitalizeFirstLetter = string => {
  if (!string) return '';
  return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
};

export const convertSkillArray = skills => {
  if (!Array.isArray(skills)) return '';
  return skills.map(skill => capitalizeFirstLetter(skill.skillName)).join(', ');
};

export const convertDateMeeting = (meeting, index) => {
  const availableFrom = dayjs(meeting.availableFrom, 'DD-MM-YYYY HH:mm');
  const availableTo = dayjs(meeting.availableTo, 'DD-MM-YYYY HH:mm');

  const date = availableFrom.format('DD-MM-YYYY'); 
  const start = availableFrom.format('HH:mm'); 
  const end = availableTo.format('HH:mm'); 

  return `Meeting ${index}: ${date}, ${start} - ${end}`;
};
