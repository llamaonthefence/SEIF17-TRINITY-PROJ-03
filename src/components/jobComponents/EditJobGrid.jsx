import { useState } from "react";
import { Box, SimpleGrid, useDisclosure } from "@chakra-ui/react";
import {
  EditJobCard,
  Pagination,
  ViewJobCardModal,
  EditJobCardModal,
  DeleteJobCardModal,
} from "../index";

function EditJobGrid({ datas }) {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 15; // 5 columns x 3 rows
  const totalPages = Math.ceil(datas.length / itemsPerPage);

  const currentData = datas.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // Disclosures for ViewJobCardModal and EditJobCardModal
  const {
    isOpen: isViewJobCardOpen,
    onOpen: onViewJobCardOpen,
    onClose: onViewJobCardClose,
  } = useDisclosure();
  const {
    isOpen: isEditJobCardOpen,
    onOpen: onEditJobCardOpen,
    onClose: onEditJobCardClose,
  } = useDisclosure();

  const {
    isOpen: isDeleteJobCardOpen,
    onOpen: onDeleteJobCardOpen,
    onClose: onDeleteJobCardClose,
  } = useDisclosure();

  const [selectedJob, setSelectedJob] = useState(null);

  const openViewJobCardModal = (jobData) => {
    setSelectedJob(jobData);
    onViewJobCardOpen();
  };

  const openEditJobCardModal = (jobData) => {
    setSelectedJob(jobData);
    onEditJobCardOpen();
  };

  const openDeleteJobCardModal = (jobData) => {
    setSelectedJob(jobData);
    onDeleteJobCardOpen();
  };

  return (
    <>
      {/* EditJobGrid Component*/}
      <Box className="EditJobGrid" py={4}>
        {/* Mapped created posts in Grid */}
        <SimpleGrid columns={2} spacing={4}>
          {currentData.map((data, index) => (
            <EditJobCard
              key={index}
              data={data}
              openViewJobCardModal={openViewJobCardModal}
              openEditJobCardModal={openEditJobCardModal}
              openDeleteJobCardModal={openDeleteJobCardModal}
            />
          ))}
        </SimpleGrid>

        {/* ViewJobCardModal */}
        {selectedJob && (
          <ViewJobCardModal
            isOpen={isViewJobCardOpen}
            closeModal={onViewJobCardClose}
            data={selectedJob}
          />
        )}

        {/* EditJobCardModal */}
        {selectedJob && (
          <EditJobCardModal
            isOpen={isEditJobCardOpen}
            closeModal={onEditJobCardClose}
            data={selectedJob}
          />
        )}

        {/* DeleteJobCardModal */}
        {selectedJob && (
          <DeleteJobCardModal
            isOpen={isDeleteJobCardOpen}
            closeModal={onDeleteJobCardClose}
            data={selectedJob}
          />
        )}

        {/* Pagination */}
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </Box>
    </>
  );
}

export default EditJobGrid;
