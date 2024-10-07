import { Button, VStack } from '@chakra-ui/react';
import { RiDashboardFill, RiEyeFill, RiUser3Fill } from 'react-icons/ri';
import { Link } from 'react-router-dom';
import { VscMail } from 'react-icons/vsc';
import { FcApprove } from 'react-icons/fc';

export default function Sidebar() {
  return (
    <VStack spacing={'8'} p="16" boxShadow={'-2px 0 10px rgba(107,70,193,0.5)'}>
      <LinkButton Icon={RiDashboardFill} text="DashBoard" url={'dashboard'} />

      <LinkButton Icon={RiEyeFill} text="Courses" url={'coursesadmin'} />
      <LinkButton Icon={RiUser3Fill} text="Users" url={'users'} />
      <LinkButton
        Icon={FcApprove}
        text="Approve Instructor"
        url={'approveinstructor'}
      />
      <LinkButton
        Icon={VscMail}
        text="Requested Courses"
        url={'requestCourses'}
      />
      {/* <LinkButton /> */}
      {/* <LinkButton /> */}
    </VStack>
  );
}

function LinkButton({ url, Icon, text }) {
  return (
    <Link to={`/admin/${url}`}>
      <Button fontSize={'larger'} variant="ghost">
        <Icon style={{ margin: '4px' }} />
        {text}
      </Button>
    </Link>
  );
}
