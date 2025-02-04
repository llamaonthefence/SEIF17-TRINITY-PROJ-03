// ProfileSettings.jsx
import { Box, Image, Button } from "@chakra-ui/react";
import PersonalDetails from "./PersonalDetails";
import ContactDetails from "./ContactDetails";
import GAExp from "./GAexperience";
import ProfilePicUpload from "./ProfilePic";
import WorkExp from "./WorkExp";
import EduExp from "./EducationExp";
import SkillsDetails from "./SkillsDetails";
import { useState, useEffect } from "react";
import { uploadImage } from "../../api/cloudinary";
import { getUserIdFromToken } from "../../util/security";
import { getUserDetails } from "../../service/users";
import {
  getProfileDetails,
  updateProfile,
  createProfile,
} from "../../service/profiles";

function ProfileSetting() {
  const [userDetails, setUserDetails] = useState(null);
  const [profileDetails, setProfileDetails] = useState(null);

  const [formData, setFormData] = useState({
    personalDetails: {
      firstName: "",
      lastName: "",
      pronoun: "",
      additionalName: "",
    },
    contactDetails: {},
    gaExperience: [],
    workExperience: [],
    educationExperience: [],
    profilePic: null,
    skills: [],
  });

  const handleInputChange = (section, data) => {
    setFormData((prevFormData) => {
      if (Array.isArray(prevFormData[section])) {
        return {
          ...prevFormData,
          [section]: [...data],
        };
      } else if (typeof prevFormData[section] === "object") {
        return {
          ...prevFormData,
          [section]: {
            ...prevFormData[section],
            ...data,
          },
        };
      } else {
        console.warn(`Unknown data type for section ${section}`);
        return prevFormData;
      }
    });
  };

  const handleProfilePicChange = (file) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      profilePic: file,
    }));
  };

  const handleSubmit = async () => {
    console.log("FormData before submission:", formData);

    try {
      const user = getUserIdFromToken();
      const userId = await getProfileDetails(user);

      let imageUrl = formData.profilePic;
      if (formData.profilePic && typeof formData.profilePic !== "string") {
        imageUrl = await uploadImage(formData.profilePic, "profile_pics");
      }

      if (userId) {
        const updatedFormData = {
          ...formData,
          listing_id: userId.listing_id,
          profilePic: imageUrl,
        };
        await updateProfile(updatedFormData);
        alert("Profile updated.");
      } else {
        await createProfile(formData);
        alert("Profile created.");
      }
    } catch (error) {
      console.error("Error saving profile:", error);
    }
  };

  const handleCancel = () => {
    window.location.reload();
  };

  const fetchUserDetails = async () => {
    try {
      const userId = getUserIdFromToken();
      const details = await getUserDetails(userId);
      setUserDetails(details);
    } catch (error) {
      console.error("Error fetching user details:", error);
    }
  };

  const fetchProfileDetails = async () => {
    try {
      const userId = getUserIdFromToken();
      const details = await getProfileDetails(userId);
      setProfileDetails(details);
    } catch (error) {
      console.error("Error fetching profile details:", error);
    }
  };

  useEffect(() => {
    fetchUserDetails();
    fetchProfileDetails();
  }, []);

  useEffect(() => {
    if (profileDetails) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        personalDetails: {
          firstName: profileDetails.personal_details.firstName || "",
          lastName: profileDetails.personal_details.lastName || "",
          pronoun: profileDetails.personal_details.pronoun || "",
          additionalName: profileDetails.personal_details.additionalName || "",
        },
        contactDetails: profileDetails.contact_details || {},
        gaExperience: profileDetails.ga_experience || [],
        workExperience: profileDetails.work_experience || [],
        educationExperience: profileDetails.education_experience || [],
        profilePic: profileDetails.profilePic || null,
        skills: profileDetails.skills || [],
      }));
    } else if (userDetails) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        personalDetails: {
          firstName: userDetails.firstName || "",
          lastName: userDetails.lastName || "",
          pronoun: "",
          additionalName: "",
        },
        contactDetails: {
          email: userDetails.email || "",
        },
        gaExperience: [],
        workExperience: [],
        educationExperience: [],
        profilePic: null,
        skills: [],
      }));
    }
  }, [profileDetails, userDetails]);

  return (
    <Box className="ProfileSetting" height="auto" alignContent="center">
      <Image />
      <ProfilePicUpload
        profileDetails={profileDetails}
        userDetails={userDetails}
        onProfilePicChange={handleProfilePicChange} // Pass callback to ProfilePicUpload
      />
      <PersonalDetails
        onChange={(data) => handleInputChange("personalDetails", data)}
        profileDetails={profileDetails}
        userDetails={userDetails}
      />
      <ContactDetails
        onChange={(data) => handleInputChange("contactDetails", data)}
        profileDetails={profileDetails}
        userDetails={userDetails}
      />
      <SkillsDetails
        onChange={(data) => handleInputChange("skills", data)}
        profileDetails={profileDetails}
        userDetails={userDetails}
      />
      <GAExp
        onChange={(data) => handleInputChange("gaExperience", data)}
        profileDetails={profileDetails}
        userDetails={userDetails}
      />
      <WorkExp
        onChange={(data) => handleInputChange("workExperience", data)}
        profileDetails={profileDetails}
        userDetails={userDetails}
      />
      <EduExp
        onChange={(data) => handleInputChange("educationExperience", data)}
        profileDetails={profileDetails}
        userDetails={userDetails}
      />
      <Box>
        <Button colorScheme="red" mt={5} onClick={handleSubmit}>
          Save
        </Button>
        <Button colorScheme="red" mt={5} onClick={handleCancel}>
          Cancel
        </Button>
      </Box>
    </Box>
  );
}

export default ProfileSetting;
