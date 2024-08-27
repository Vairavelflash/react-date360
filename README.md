
# reactdate360

reactdate360 is a flexible and customizable date picker component for React. Unlike other date picker components, reactdate360 allows you to fully modify icons, styles, and alignment to fit your needs.

## Installation
Install the package via npm:
```bash
npm install reactdate360

```
## Usage
Here's a basic example of how to use reactdate360:

```bash
import React, { useState } from "react";
import DatePicker from "reactdate360";
import "reactdate360/dist/index.css"

const App = () => {
  const [formValues, setFormValues] = useState({ date: null });

  return (
    <DatePicker
      value={formValues?.date}
      className="dateClass"
      onChange={(date: number) => setFormValues({ date: date })}
      weekLabel={["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]}
      dateSplit="/"
      titleAlign="center"
      leftIcon={<>⬅️</>}
      rightIcon={<>➡️</>}
    />
  );
};

```
## Features
- Customizable Icons: Easily change the left and right icons for the date input.
- Flexible Styling: Apply your own styles and classes to the date picker.
- Alignment Options: Customize the alignment of the date picker title.
- Weekday Labels: Modify weekday labels to fit your preferences.
- Date Format: Choose your own date separator.


## Screenshots
![First-Code](https://raw.githubusercontent.com/Vairavelflash/react-date360/main/images/reactdate360-1.png?raw=true)![First-Image](https://raw.githubusercontent.com/Vairavelflash/react-date360/main/images/date1.png?raw=true)
![Second-Code](https://raw.githubusercontent.com/Vairavelflash/react-date360/main/images/reactdate360-2.png?raw=true)![Second-Image](https://raw.githubusercontent.com/Vairavelflash/react-date360/main/images/date2.png?raw=true)
![Third-Code](https://raw.githubusercontent.com/Vairavelflash/react-date360/main/images/reactdate360-3.png?raw=true)![Third-Image](https://raw.githubusercontent.com/Vairavelflash/react-date360/main/images/date3.png?raw=true)

## Target CSS using Classname

![Class](https://raw.githubusercontent.com/Vairavelflash/react-date360/main/images/reactdate360.png?raw=true)![ClassImage](https://raw.githubusercontent.com/Vairavelflash/react-date360/main/images/date4.png?raw=true)

## License

[MIT](https://choosealicense.com/licenses/mit/).

## Contributing

Contributions are welcome! Please feel free to submit a pull request or open an issue.
