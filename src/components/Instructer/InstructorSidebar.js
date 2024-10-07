import { Button, VStack } from '@chakra-ui/react';
import { RiAddCircleFill, RiDashboardFill, RiEyeFill } from 'react-icons/ri';
import { Link } from 'react-router-dom';
import { VscMail } from 'react-icons/vsc';

export default function InstructorSidebar() {
  return (
    <VStack spacing={'8'} p="16" boxShadow={'-2px 0 10px rgba(107,70,193,0.5)'}>
      <LinkButton Icon={RiDashboardFill} text="DashBoard" url={'dashboard'} />
      <LinkButton
        Icon={RiAddCircleFill}
        text="Create Course"
        url={'createcourse'}
      />
      <LinkButton Icon={RiEyeFill} text="Courses" url={'courses'} />
      <LinkButton
        Icon={VscMail}
        text="Requested Courses"
        url={'requestCourses'}
      />
    </VStack>
  );
}

function LinkButton({ url, Icon, text }) {
  return (
    <Link to={`/instructor/${url}`}>
      <Button fontSize={'larger'} variant="ghost">
        <Icon style={{ margin: '4px' }} />
        {text}
      </Button>
    </Link>
  );
}
