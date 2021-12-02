export const createFormData = (photo, body) => {
  const data = new FormData();
  if (photo) {
    data.append('photo_profile', {
      name: photo.fileName,
      uri:
        Platform.OS === 'android'
          ? photo.uri
          : photo.uri.replace('file://', ''),
      type: photo.type
    });
  }

  Object.keys(body).forEach(key => {
    data.append(key, body[key]);
  });

  return data;
};
