import { TwTrnButton } from "/src/components";
import { AiOutlineArrowLeft } from "react-icons/ai";

const AddContacts = ({ previousContentRef, setSideBarContent }) => {
  return (
    <section className="flex flex-col items-center p-4 px-8">
        <TwTrnButton
          clickHandler={() => setSideBarContent(previousContentRef.current)}
          addClass="w-full flex gap-2"
        ><AiOutlineArrowLeft className="text-lg" /> Add Contacts</TwTrnButton>
    </section>
  );
};

export default AddContacts;
