import { DocumentsResponseBody, DocumentsResponse } from "./models.ts"

export function getCitationFilePath(citation: string): string {
    return `https://stovuktdn5g4hvs.blob.core.windows.net/content/${citation}`;
}

export function getAnalysisQuestion(): string {
    return `Does the coupon adjust in the "right" direction(i.e. an increase in credit risk would lead to an increase in the coupons)?`;
}

export function getAllAnalysisQuestion(): string[] {
    return [
        `Does the coupon adjust in the "right" direction(i.e. an increase in credit risk would lead to an increase in the coupons) ?`,
        `Is the amount of the step-up fixed in the contract(for example: for certain change in rating the intrest paid increases by 50 bp) ?`
    ];
}


export async function getDocuments(): Promise<any> {
    return true;
}


export async function getQuestionnaire(): Promise<any> {
    try {
        const response = await fetch(`questionnaire/get`, {
            method: "GET"
        });
        return await response.json();
    }
    catch {
        return [];
    }
}