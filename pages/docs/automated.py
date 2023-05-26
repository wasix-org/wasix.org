# open a file
import os
import re
interface_map = dict()

with open('./wasi-snapshot-preview1.witx') as f:
    # read the lines
    lines = f.readlines()
    # make a list of lines

    lines = [line for line in lines]
    i = 0
    while i < len(lines):
        line = lines[i]
        found = False
        witx_function = []
        if re.match(r"^\s*\(@interface", line):
            match = re.match(
                r"^\s*\(@interface \w+ \(export \"(\w+)\"\)", line)
            if match:
                found = True
                function_name = match.group(1)
                start_ptr = i-1
                # get the comments above the function declaration
                while re.match(r"^\s*;;;", lines[start_ptr]):
                    witx_function.append(lines[start_ptr])
                    start_ptr -= 1
                while not re.match(r"^\s*\)", lines[i]):
                    witx_function.append(lines[i])
                    i += 1

                witx_function.append(lines[i])
                interface_map[function_name] = witx_function
            else:
                print("No match")
        if found:
            i -= 1
        i += 1

# traverse over the directory `api-reference`

# for each file, read the contents
# for each function, check if it is present in the interface_map
# if yes, replace the contents with the contents of the interface_map
# write the contents back to the file
for filename in os.listdir("./api-reference"):
    if filename.endswith(".mdx"):
        filename_without_extension = filename.split(".")[0]
        with open("./api-reference/" + filename, 'r+') as f:
            lines = f.readlines()
            lines = [line for line in lines]
            i = 0
            found = False
            try:
                while i < len(lines):
                    line = lines[i]
                    if re.match(r"```", line):
                        found = True
                        print("Found")
                        start_ptr = i
                        i += 1
                        while not re.match(r"```", lines[i]):
                            i += 1
                        print(lines[start_ptr:i+1])
                        print(filename_without_extension)
                        lines[start_ptr:i+1] = ["```ebnf\n"] + \
                            interface_map[filename_without_extension]+["```"]
                    if found:
                        break
                    i += 1
                f.seek(0)
                f.writelines(lines)
                f.truncate()
            except:
                continue
