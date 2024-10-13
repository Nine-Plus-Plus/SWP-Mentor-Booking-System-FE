export const capitalizeFirstLetter = string => {
  if (!string) return '';
  return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
};

export const convertSkillArray = skills => {
  if (!Array.isArray(skills)) return '';
  return skills.map(skill => capitalizeFirstLetter(skill.skillName)).join(', ');
};
