import { TwTrnButton } from "/src/components";

const AddContacts = ({ previousContentRef, setSideBarContent }) => {
  return (
    <section className="flex flex-col items-center p-4 px-8">
        <TwTrnButton
          clickHandler={() => setSideBarContent(previousContentRef.current)}
          addClass="w-full"
        >{`< Add Contacts`}</TwTrnButton>
    </section>
  );
};

export default AddContacts;
