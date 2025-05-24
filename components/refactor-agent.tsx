"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CodeSection } from "./code-section";
import { LanguageSelector } from "./language-selector";
import { SampleButtons } from "./sample-buttons";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

import { useInputOutput } from "@/hooks/use-input-output";
import { Language } from "@/types/enums";

export const RefactorAgent = () => {
	const [inputCode, setInputCode] = useState("");
	const [language, setLanguage] = useState<Language>(Language.REACT);

	const { output, isLoading, generate, stop, clear } = useInputOutput({
		api: "/api/refactor/chat",
		body: { language },
		onSuccess: () => {
			toast.success("Code refactored successfully");
		},
		onError: (error) => {
			toast.error(`Refactoring failed: ${error.message}`);
		},
	});

	const handleSampleSelect = (code: string, sampleLanguage: Language) => {
		setInputCode(code);
		setLanguage(sampleLanguage);
		clear();
	};

	const handleRefactor = async () => {
		if (!inputCode.trim()) {
			toast.error("Please enter some code to refactor.");
			return;
		}

		const prompt = `Please refactor this ${language} code to follow design system standards and best practices:
    \n\n\`\`\`${language}\n${inputCode}\n\`\`\``;

		await generate(prompt);
	};

	const handleLanguageChange = (newLanguage: Language) => {
		setLanguage(newLanguage);
		clear();
	};

	return (
		<Card>
			<CardHeader>
				<div className="flex items-center justify-between">
					<CardTitle>Refactor Agent</CardTitle>
					<SampleButtons onSampleSelect={handleSampleSelect} />
				</div>
			</CardHeader>
			<CardContent className="space-y-6">
				<div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
					<div className="space-y-4">
						<div className="flex items-center gap-4 min-h-[40px]">
							<LanguageSelector
								value={language}
								onChange={handleLanguageChange}
								className="w-48"
							/>
						</div>
						<CodeSection
							title="Input Code"
							value={inputCode}
							onChange={setInputCode}
							placeholder="Paste your code here to refactor..."
						/>
					</div>

					<div className="space-y-4">
						<div className="min-h-[40px]" />
						<CodeSection
							title="Refactored Code"
							value={output}
							readOnly
							placeholder="Refactored code will appear here..."
						/>
					</div>
				</div>

				<div className="flex justify-center gap-4">
					<Button
						onClick={handleRefactor}
						disabled={isLoading || !inputCode.trim()}
						className="px-8"
					>
						{isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
						Refactor Code
					</Button>
					{isLoading && (
						<Button
							variant="outline"
							onClick={stop}
							className="px-4"
						>
							Stop
						</Button>
					)}
					{output && (
						<Button
							variant="outline"
							onClick={clear}
							className="px-4"
						>
							Clear
						</Button>
					)}
				</div>
			</CardContent>
		</Card>
	);
};

