
import Swal from 'sweetalert2';

export const useSwalSuccess = (onClose) => {
  const swalSuccess = () => {
    Swal.fire({
      title: "Success!",
      text: "Your operation was successful!",
      icon: "success",
      customClass: {
        container: 'swal-overlay',
       
      },
    });
    if (onClose) {
      onClose();
    }
    setTimeout(() => {
      window.location.reload();
    }, 3000);
  };

  return swalSuccess;
};
