export const detectBoundaryColor = (imageData) => {
	const { data } = imageData;
	return [data[0], data[1], data[2], data[3]];
};

export const colorMap = {
	transparent: [0, 0, 0, 0],
	white: [255, 255, 255, 255],
	black: [0, 0, 0, 255]
};

export const getBoundaryColor = (imageData, colorIndex) => {
	switch (colorIndex) {
		case 'transparentOrWhite':
			const detectedBoundaryColor = detectBoundaryColor(imageData);
			if (
				[colorMap.transparent.join(), colorMap.white.join()].includes(detectedBoundaryColor.join())
			) {
				return detectedBoundaryColor;
			} else {
				return false;
			}
		case 'automatic':
			return detectBoundaryColor(imageData);
		case 'transparent':
			return [0, 0, 0, 0];
		case 'white':
			return [255, 255, 255, 255];
		case 'black':
			return [0, 0, 0, 255];
	}
};

export const getImageData = (file) => {
	return new Promise((resolve) => {
		const fileReader = new FileReader();

		fileReader.onload = (event) => {
			const image = new Image();

			image.onload = () => {
				const canvas = document.createElement('canvas');
				const context = canvas.getContext('2d');

				canvas.width = image.naturalWidth;
				canvas.height = image.naturalHeight;
				context.drawImage(image, 0, 0, canvas.width, canvas.height);

				const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
				resolve(imageData);
			};

			const result = event?.target?.result;
			if (typeof result === 'string') {
				image.src = result;
			}
		};

		fileReader.readAsDataURL(file);
	});
};

export const getCroppedImageData = (imageData, boundaryColor = false) => {
	// Return imageData if no boundaryColor
	if (!boundaryColor) return imageData;
	// Calculate the bounds of the non-boundary pixels
	let minX = imageData.width;
	let minY = imageData.height;
	let maxX = 0;
	let maxY = 0;

	for (let y = 0; y < imageData.height; y++) {
		for (let x = 0; x < imageData.width; x++) {
			const i = (y * imageData.width + x) * 4; // Index of current pixel in the data array

			// Check if the current pixel's color matches the boundary color
			if (imageData.data[i] === boundaryColor[0] &&
				imageData.data[i + 1] === boundaryColor[1] &&
				imageData.data[i + 2] === boundaryColor[2] &&
				imageData.data[i + 3] === boundaryColor[3]) {
				continue; // Skip boundary pixels
			}

			// Update the bounds of the non-boundary pixels
			if (x < minX) minX = x;
			if (y < minY) minY = y;
			if (x > maxX) maxX = x;
			if (y > maxY) maxY = y;
		}
	}

	// Calculate the size of the cropped image
	const cropWidth = maxX - minX + 1;
	const cropHeight = maxY - minY + 1;

	// Create a new ImageData object to store the cropped image
	const newImageData = new ImageData(cropWidth, cropHeight);

	// Copy the non-boundary pixels into the new image
	for (let y = 0; y < cropHeight; y++) {
		for (let x = 0; x < cropWidth; x++) {
			const srcX = minX + x;
			const srcY = minY + y;
			const srcI = (srcY * imageData.width + srcX) * 4; // Index of current pixel in the data array

			const dstI = (y * cropWidth + x) * 4; // Index of current pixel in the new data array

			// Copy the non-boundary pixel from the old image to the new image
			newImageData.data[dstI] = imageData.data[srcI];
			newImageData.data[dstI + 1] = imageData.data[srcI + 1];
			newImageData.data[dstI + 2] = imageData.data[srcI + 2];
			newImageData.data[dstI + 3] = imageData.data[srcI + 3];
		}
	}

	return newImageData;
}

export const getCroppedDataUrl = (croppedImageData) => {
	const canvas = document.createElement('canvas');
	canvas.width = croppedImageData.width;
	canvas.height = croppedImageData.height;
	const ctx = canvas.getContext('2d');
	ctx.putImageData(croppedImageData, 0, 0);
	return canvas.toDataURL();
}