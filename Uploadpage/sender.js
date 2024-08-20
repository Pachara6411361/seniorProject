if (typeof window.FormData !== 'undefined') {
    if (window.FormData && 'file' in window.FormData) {
      const targetDir = 'uploads/';
      const filename = window.FormData.get('file').name;
      const targetFilePath = targetDir + filename;
      window.FormData.append('file', window.FormData.get('file'), filename);
      fetch(targetFilePath, {
        method: 'POST',
        body: window.FormData.get('file')
      })
      .then(response => {
        console.log('File Uploaded');
      })
      .catch(error => {
        console.error('Error uploading file:', error);
      });
    } else {
      console.error('FormData is not supported in this browser');
    }
  } else {
    console.error('FormData is not supported in this browser');
  }
  
  