#include <iostream>
#include <fstream>
#include <vector>
#include <string>
#include "days.h"

#define DAY 1
#define DATA_SUFFIX ""

#define STR1(x) #x
#define STR(x) STR1(x)
#define CONCAT1(a, b) a ## b
#define CONCAT(a, b) CONCAT1(a, b)
#define SOLUTION(part) CONCAT(CONCAT(day, DAY), part)
#define DATA_PATH(d) "..\\day" STR(d) DATA_SUFFIX ".txt"

int main()
{
    size_t day = DAY;
    std::string dataPath = DATA_PATH(DAY);
    std::string (*solution1)(const std::vector<std::string>&) = SOLUTION(a);
    std::string (*solution2)(const std::vector<std::string>&) = SOLUTION(b);
    
    std::ifstream data(dataPath);
    // break into lines
    std::vector<std::string> lines;
    std::string line;
    while (std::getline(data, line))
    {
        lines.push_back(line);
    }
    data.close();

    std::cout << "Day " << day << " part 1: " << solution1(lines) << std::endl;
    std::cout << "Day " << day << " part 2: " << solution2(lines) << std::endl;
    return 0;
}

