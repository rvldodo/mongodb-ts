import UniversityInterface from '@/resources/university/university.interface';
import University from '@/resources/university/university.model';

class UniversityService {
    private university = University;

    /**
     * Create a new University
     */
    public async create(
        data: UniversityInterface
    ): Promise<UniversityInterface> {
        try {
            const duplicate = await this.university.findOne({
                email: { $regex: data.name, $options: 'i' },
            });

            if (duplicate) throw new Error('University already exists');
            const university = this.university.create(data);
            return university;
        } catch (error) {
            throw new Error('Cannot create a new University');
        }
    }

    /**
     * Find all university
     */
    public async findAll(): Promise<UniversityInterface[]> {
        try {
            const universities = await this.university.find();
            if (!universities || universities.length === 0)
                throw new Error('Universities not found or empty');
            return universities;
        } catch (error) {
            throw new Error('Cannot find all university');
        }
    }
}

export default UniversityService;
