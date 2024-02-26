import React from 'react';
import CKEditor  from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';



const MyTextarea = () => {
  return (
    <CKEditor
    editor={ClassicEditor}
    data="<p>This is an example content.</p>"
    onReady={(editor) => {
     
      console.log('Editor is ready to use!', editor);
    }}
    onChange={(event, editor) => {
      const data = editor.getData();
      console.log({ event, editor, data });
    }}
  />
  );
};

export default MyTextarea;
