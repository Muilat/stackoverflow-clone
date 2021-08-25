const allRoles = {
  user: ['createQuestion'],
  admin: ['createTags'],
};

const roles = Object.keys(allRoles);
const roleRights = new Map(Object.entries(allRoles));

module.exports = {
  roles,
  roleRights,
};
