import { NoticeModel, Notice } from '../models/Notice.model';

export async function createNotice(data: Partial<Notice>): Promise<Notice> {
    const notice = new NoticeModel(data);
    return await notice.save();
}

export async function listNotices(filter: any = {}): Promise<Notice[]> {
    return await NoticeModel.find(filter)
        .sort({ issuedDate: -1 })
        .exec();
}

export async function getNoticeById(id: string): Promise<Notice | null> {
    return await NoticeModel.findById(id).exec();
}

export async function updateNotice(id: string, data: Partial<Notice>): Promise<Notice | null> {
    return await NoticeModel.findByIdAndUpdate(id, data, { new: true }).exec();
}

export async function deleteNotice(id: string): Promise<Notice | null> {
    return await NoticeModel.findByIdAndDelete(id).exec();
}

export async function getActiveNotices(instituteId: string): Promise<Notice[]> {
    const now = new Date();
    return await NoticeModel.find({
        instituteId,
        $or: [{ expiryDate: { $gte: now } }, { expiryDate: null }],
    })
        .sort({ priority: -1, issuedDate: -1 })
        .exec();
}

export async function getNoticesByClass(
    instituteId: string,
    classId: string,
    section?: string
): Promise<Notice[]> {
    const filter: any = {
        instituteId,
        $or: [
            { targetedClassId: classId },
            { targetedClassId: { $exists: false } },
            { targetedClassId: [] },
        ],
    };

    if (section) {
        filter.$or.push({ targetSections: section });
    }

    return await NoticeModel.find(filter)
        .sort({ issuedDate: -1 })
        .exec();
}
