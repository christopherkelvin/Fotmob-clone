function Message() {
    const items = ['Cryser', 'Christopher', 'Kelvin']
    return (

      <>
          <h1 className=" text-2xl grid place-content-center font-bold font-serif">
            Hello Cryser
            </h1>
            <ul>
                {items.map((item) => 
                (

                    <li key={item}>{ item}</li>
                )    
                )}
            </ul>
      </>
    );
}
export default Message;