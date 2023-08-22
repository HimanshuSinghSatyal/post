import React, { useState, FC } from 'react';
import { Checkbox } from '@mui/material';
import { TreeView, TreeItem } from '@mui/lab';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';



const departments = [
  {
    department: 'customer_service',
    sub_departments: ['support', 'customer_success']
  },
  {
    department: 'design',
    sub_departments: ['graphic_design', 'product_design', 'web_design']
  }
];



const DepartmentList: FC = () => {
  const [checked, setChecked] = useState<string[]>([]);
  const [expanded, setExpanded] = useState<string[]>([]);

  const handleToggle = (value: string) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      const subDepartments = departments.find((dept) => dept.department === value)?.sub_departments;
      if (subDepartments) {
        newChecked.push(...subDepartments);
      }
      newChecked.push(value);
    } else {
      const subDepartments = departments.find((dept) => dept.department === value)?.sub_departments;
      if (subDepartments) {
        newChecked.splice(currentIndex, subDepartments.length + 1);
      } else {
        newChecked.splice(currentIndex, 1);
      }
    }

    setChecked(newChecked);
  };


  const handleExpand = (value: string) => () => {
    const newExpanded = expanded.includes(value)
      ? expanded.filter((item) => item !== value)
      : [...expanded, value];
    setExpanded(newExpanded);
  };

  const isDepartmentSelected = (department: string) => {
    const subDepartments = departments.find((dept) => dept.department === department)?.sub_departments;
    return subDepartments && subDepartments.every((subDept) => checked.includes(subDept));
  };

  const isAllSubDepartmentsSelected = (department: string) => {
    const subDepartments = departments.find((dept) => dept.department === department)?.sub_departments;
    return subDepartments && subDepartments.every((subDept) => checked.includes(subDept));
  };

  return (
    <TreeView
      defaultCollapseIcon={<ExpandMoreIcon />}
      defaultExpandIcon={<ChevronRightIcon />}
    >
      {departments.map((department) => (
        <TreeItem
          key={department.department}
          nodeId={department.department}
          label={
            <div>
              <Checkbox
                checked={isDepartmentSelected(department.department)}
                indeterminate={
                  checked.includes(department.department) &&
                  !isAllSubDepartmentsSelected(department.department)
                }
                onChange={handleToggle(department.department)}
              />
              {department.department}
            </div>
          }
          onClick={handleExpand(department.department)}
        >
          {Array.isArray(department.sub_departments)
            ? department.sub_departments.map((subDept) => (
              <TreeItem
                key={subDept}
                nodeId={subDept}
                label={
                  <div>
                    <Checkbox
                      checked={checked.includes(subDept)}
                      onChange={handleToggle(subDept)}
                    />
                    {subDept}
                  </div>
                }
              />
            ))
            : null}
        </TreeItem>
      ))}
    </TreeView>
  );
};

export default DepartmentList;
