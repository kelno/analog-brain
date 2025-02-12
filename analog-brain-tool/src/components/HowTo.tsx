const HowTo = () => {
  return (
    <>
      <p>
        <b>Do NOT read it straight through! Skipping around is the point!</b>
      </p>
      <p className="pt-6">This tool is designed to ask you questions and lead you to a helpful answer.</p>

      <ul className="list-disc pl-5">
        <li>
          Go to{' '}
          <a className="link-default underline" href="#tool">
            the first question in the tool
          </a>
        </li>
        <li>If you know what you want, click Yes</li>
        <li>If you don’t know what you want, click No</li>
        <li>Follow the prompts and keep clicking answers until you get to where you want to be</li>
        <li>Click “Back to top” in any section to return to the first question</li>
      </ul>

      <p className="pt-6">
        P.S. The Analog Brain is also <em>printable</em>. All sections and answers are numbered!
      </p>
      <p></p>
    </>
  );
};

export default HowTo;
