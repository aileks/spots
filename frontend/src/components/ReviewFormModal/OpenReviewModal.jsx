import { useModal } from "../../context/Modal";

export default function OpenReviewModal({
  modalComponent,
  itemText,
  onModalClose,
}) {
  const { setModalContent, setOnModalClose } = useModal();

  const onClick = () => {
    if (onModalClose) setOnModalClose(onModalClose);
    setModalContent(modalComponent);
  };

  return (
    <button id="review-button" onClick={onClick}>
      {itemText}
    </button>
  );
}
