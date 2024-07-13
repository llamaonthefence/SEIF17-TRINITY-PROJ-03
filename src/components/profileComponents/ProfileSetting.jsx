import { Box, Image } from "@chakra-ui/react";
import PersonalDetails from "./PersonalDetails";
import ContactDetails from "./ContactDetails";
import GAExp from "./GAexperience";
import ProfilePicUpload from "./ProfilePic";
import WorkExp from "./WorkExp";
import EduExp from "./EducationExp";

function ProfileSetting() {
  return (
    <>
      {/* ProfileSetting Component */}
      <Box className="ProfileSetting" height="auto" alignContent="center">
        <Image />
        <ProfilePicUpload />
        <PersonalDetails />
        <ContactDetails />
        <GAExp />
        <WorkExp />
        <EduExp />
        <Box className="education-box"></Box>
      </Box>
    </>
  );
}

export default ProfileSetting;
