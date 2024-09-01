import { useCallback, useState, useEffect, useRef } from 'react';

function Generator(props) {
  const [Length, setLength] = useState(6); // Default length is set to 6
  const [Number, setNumber] = useState(false);
  const [Char, setChar] = useState(false);
  const [Password, setPassword] = useState("");
  const [Dark, setDark] = useState(true);


    // ref hook
  const passRef = useRef(null); //We use this to make the user experience good by when we copy the text then the text is highlight


  const textCopying  = useCallback(()=>{ 
    passRef.current?.select(); // this is use to select the character when we click the copy button
    passRef.current.setSelectionRange(0,100) //This helps;
    window.navigator.clipboard.writeText(Password );
  },[Password]);

  function clickMe() {
    setDark(!Dark);
  }

  const passwordGenerator = useCallback(() => {
    let password = "";
    let str = "ABCDEFGJIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (Number) str += "0123456789";
    if (Char) str += "!@#$%^&*()_+";

    for (let i = 0; i < Length; i++) {
      let char = Math.floor(Math.random() * str.length);
      password += str.charAt(char);
    }
    setPassword(password);
  }, [Length, Number, Char]);

  useEffect(() => {
    passwordGenerator();
  }, [Length, Number, Char, passwordGenerator]);

  return (
      <div className={`${Dark ? 'bg-gray-900 text-white' : 'bg-gray-100 text-black'} min-h-screen flex flex-col items-center justify-center`}>

       <div className='relative -top-9'>
        
        <h1 className="font-bold text-center font-sans text-4xl mb-10 relative -bottom-14">
          Password Generator
        </h1>

        <div className='flex justify-end w-full max-w-lg'>
          <button
            onClick={clickMe}
            className='px-6 py-3 font-bold text-white bg-blue-500 rounded shadow-md hover:bg-blue-600 transition relative -top-52 -right-96'>
            {props.btn}
          </button>
        </div>

        <div className='w-full max-w-lg mt-8 bg-blue-900 p-4 text-orange-500 font-bold shadow-lg rounded-lg flex justify-between items-center'>
          <input
            type="text"
            value={Password}
            className='p-2 outline-none bg-white text-black rounded w-full'
            placeholder='Password'
            readOnly
            ref={passRef}
            />
          <button className='ml-4 bg-orange-500 text-white px-4 py-2 rounded shadow-md hover:bg-orange-600 transition' onClick={textCopying}>
            Copy
          </button>
        </div>

        <div className='w-full max-w-lg mt-8'>
          <div className='flex justify-between items-center mb-6'>
            <label className='text-orange-500 font-bold text-xl'>Length: {Length}</label>
            <input
              type="range"
              min={6}
              max={100}
              value={Length}
              className='cursor-pointer w-2/3'
              onChange={(e) => setLength(parseInt(e.target.value))}
              />
          </div>

          <div className='flex justify-between'>
            <div className='flex items-center'>
              <input
                type="checkbox"
                checked={Number}
                onChange={() => setNumber((prev) => !prev)}
                className='cursor-pointer'
                />
              <label className='text-orange-500 font-bold text-xl ml-2'>Numbers</label>
            </div>

            <div className='flex items-center'>
              <input
                type="checkbox"
                checked={Char}
                onChange={() => setChar((prev) => !prev)}
                className='cursor-pointer'
                />
              <label className='text-orange-500 font-bold text-xl ml-2'>Characters</label>
            </div>
          </div>
        </div>
      </div>
</div>
  );
}

export default Generator