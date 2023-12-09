#include <string>
#include <vector>

std::string day1a(const std::vector<std::string>& data)
{
	long sum = 0;
	for (const std::string& line : data)
	{
		int n1 = -1, n2 = 0;
		for (size_t i = 0; i < line.size(); i++) {
			if (isdigit(line[i])) {
				if (n1 == -1) n1 = line[i] - '0';
				n2 = line[i] - '0';
			}
		}
		sum += n1 * 10 + n2;
	}
	return std::to_string(sum);
}

std::string day1b(const std::vector<std::string>& data)
{
	const char* numberNames[] = {"one", "1", "two", "2", "three", "3", "four", "4", "five", "5", "six", "6", "seven", "7", "eight", "8", "nine", "9"};
	long sum = 0;
	for (const std::string& line : data) 
	{
		int minPos = -1, minNumber = 0;
		for (size_t i = 0; i < _countof(numberNames); i++) {
			int pos = line.find(numberNames[i]);
			if (pos != std::string::npos) {
				if (minPos == -1 || pos < minPos) {
					minPos = pos;
					minNumber = i / 2 + 1;
				}
			}
		}

		int maxPos = -1, maxNumber = 0;
		for (size_t i = 0; i < _countof(numberNames); i++) {
			int pos = line.rfind(numberNames[i]);
			if (pos != std::string::npos) {
				if (maxPos == -1 || pos > maxPos) {
					maxPos = pos;
					maxNumber = i / 2 + 1;
				}
			}
		}

		sum += minNumber * 10 + maxNumber;
	}
	return std::to_string(sum);
}
