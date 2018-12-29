const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

(<any>ctx).mozImageSmoothingEnabled = false;
(<any>ctx).webkitImageSmoothingEnabled = false;
(<any>ctx).msImageSmoothingEnabled = false;
(<any>ctx).imageSmoothingEnabled = false;

export { canvas, ctx };
