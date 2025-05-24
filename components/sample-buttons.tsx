"use client";

import { Button } from "@/components/ui/button";
import { sampleCode } from "@/lib/sample-code";
import { Language } from "@/types/enums";

const samples = [
	{ key: Language.REACT, label: "React Sample", code: sampleCode[Language.REACT] },
	{ key: Language.KOTLIN, label: "Kotlin Sample", code: sampleCode[Language.KOTLIN] },
	{ key: Language.SWIFT, label: "Swift Sample", code: sampleCode[Language.SWIFT] },
];

interface SampleButtonsProps {
	onSampleSelect: (code: string, language: Language) => void;
	className?: string;
}

export const SampleButtons = ({ onSampleSelect, className = "" }: SampleButtonsProps) => (
	<div className={`flex gap-2 ${className}`}>
		{samples.map((sample) => (
			<Button
				key={sample.key}
				variant="outline"
				size="sm"
				onClick={() => onSampleSelect(sample.code, sample.key)}
			>
				{sample.label}
			</Button>
		))}
	</div>
);

