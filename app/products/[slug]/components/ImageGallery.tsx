'use client';

import Image from 'next/image';
import { useState } from 'react';

type ImageGalleryProps = {
	images: string[];
	name: string;
};

export default function ImageGallery({ images, name }: ImageGalleryProps) {
	const [selectedIndex, setSelectedIndex] = useState(0);

	const imageList = images.length > 0 ? images : ['/images/placeholder.png'];
	const mainImage = imageList[selectedIndex] || '/images/placeholder.png';

	return (
		<div className="space-y-4">
			<div className="relative aspect-square w-full bg-gray-100 rounded-lg overflow-hidden">
				<Image
					src={mainImage}
					alt={`${name} - изображение ${selectedIndex + 1}`}
					fill
					sizes="(max-width: 768px) 100vw, 50vw"
					className="object-cover"
					priority
				/>
			</div>
			{imageList.length > 1 && (
				<div className="flex gap-2 overflow-x-auto pb-2">
					{imageList.map((img, idx) => (
						<button
							key={idx}
							onClick={() => setSelectedIndex(idx)}
							className={`relative w-20 h-20 border-2 rounded-md overflow-hidden shrink-0 cursor-pointer ${
								idx === selectedIndex ? 'border-blue-500' : 'border-transparent'
							}`}
						>
							<Image
								src={img}
								alt={`${name} - миниатюра ${idx + 1}`}
								fill
								sizes="80px"
								className="object-cover"
							/>
						</button>
					))}
				</div>
			)}
		</div>
	);
}
