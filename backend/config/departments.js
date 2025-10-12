// Department configuration for multi-department support
const DEPARTMENTS = {
  ITEG: 'ITEG',
  MEG: 'MEG', 
  BEG: 'BEG',
  BTECH: 'BTECH'
};

const DEPARTMENT_DETAILS = {
  [DEPARTMENTS.ITEG]: {
    name: 'Information Technology and Engineering Group',
    code: 'ITEG',
    description: 'Information Technology and Engineering programs'
  },
  [DEPARTMENTS.MEG]: {
    name: 'Mechanical Engineering Group',
    code: 'MEG',
    description: 'Mechanical Engineering programs'
  },
  [DEPARTMENTS.BEG]: {
    name: 'Basic Engineering Group',
    code: 'BEG', 
    description: 'Basic Engineering programs'
  },
  [DEPARTMENTS.BTECH]: {
    name: 'Bachelor of Technology',
    code: 'BTECH',
    description: 'Bachelor of Technology programs'
  }
};

const VALID_DEPARTMENTS = Object.values(DEPARTMENTS);

module.exports = {
  DEPARTMENTS,
  DEPARTMENT_DETAILS,
  VALID_DEPARTMENTS
};