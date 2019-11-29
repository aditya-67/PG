import json

final = []
with open('page.json') as json_file:
    data = json.load(json_file)

with open('data/patients.json') as json_file:
	p_data = json.load(json_file)
	data['model'] = 'patients.patient'
	for j in range(len(p_data)):
		data['pk'] = p_data[j]['id'] + 1
		del p_data[j]['id']
		data['fields'] = p_data[j]
		final.append(data.copy())

	with open('patients.json', 'w', encoding='utf-8') as d:
		json.dump(final, d, ensure_ascii=False, indent=4)

final = []
with open('data/samples.json') as json_file:
	p_data = json.load(json_file)
	data['model'] = 'patients.sample'
	for j in range(len(p_data)):
		data['pk'] = p_data[j]['id'] + 1
		del p_data[j]['id']
		data['fields'] = p_data[j]
		final.append(data.copy())

	with open('samples.json', 'w', encoding='utf-8') as d:
		json.dump(final, d, ensure_ascii=False, indent=4)

final = []
with open('data/variants.json') as json_file:
	p_data = json.load(json_file)
	data['model'] = 'patients.variant'
	for j in range(len(p_data)):
		data['pk'] = p_data[j]['id'] + 1
		del p_data[j]['id']
		data['fields'] = p_data[j]
		final.append(data.copy())

	with open('variants.json', 'w', encoding='utf-8') as d:
		json.dump(final, d, ensure_ascii=False, indent=4)