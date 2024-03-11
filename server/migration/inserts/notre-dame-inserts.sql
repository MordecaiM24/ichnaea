INSERT INTO colleges (full_name, short_name, kebab_name, location, setting, campus_size, gen_ranking, acceptance_rate, num_students, base_cost, cost_after_aid, privacy, sat_25th_percentile, sat_50th_percentile, sat_75th_percentile, act_25th_percentile, act_50th_percentile, act_75th_percentile) VALUES ('University of Notre Dame', 'Notre Dame', 'notre-dame', 'Notre Dame, IN', 'Suburban', 1265, 18, 15.1, 8973, 60301, 31101, 'Private', 1420, 1490, 1550, 32, 33, 35);
-- Deadline 1 for University of Notre Dame
INSERT INTO deadlines (id, college_id, decision_type, date, special_name, financial_aid_deadline) VALUES (gen_random_uuid(), (SELECT id FROM colleges WHERE full_name = 'University of Notre Dame'), 'regularDecision', '2024-01-02T00:00:00.000Z', 'Regular Decision', '2024-02-16T00:00:00.000Z');
-- Deadline 2 for University of Notre Dame
INSERT INTO deadlines (id, college_id, decision_type, date, special_name, financial_aid_deadline) VALUES (gen_random_uuid(), (SELECT id FROM colleges WHERE full_name = 'University of Notre Dame'), 'earlyAction', '2023-11-02T00:00:00.000Z', 'Restrictive Early Action', '2023-11-16T00:00:00.000Z');
-- Supplemental Essay 1 for University of Notre Dame
INSERT INTO supplemental_essays (id, college_id, prompt, word_limit) VALUES (gen_random_uuid(), (SELECT id FROM colleges WHERE full_name = 'University of Notre Dame'), '1. Notre Dame fosters an undergraduate experience dedicated to the intellectual, moral, and spiritual development of each individual, characterized by a collective sense of care for every person.  How do you foster service to others in your community? ', 150);
-- Supplemental Essay 2 for University of Notre Dame
INSERT INTO supplemental_essays (id, college_id, prompt, word_limit) VALUES (gen_random_uuid(), (SELECT id FROM colleges WHERE full_name = 'University of Notre Dame'), '2. What is distinctive about your personal experiences and development (eg, family support, culture, disability, personal background, community, etc)?  Why are these experiences important to you and how will you enrich the Notre Dame community? ', 150);
-- Supplemental Essay 3 for University of Notre Dame
INSERT INTO supplemental_essays (id, college_id, prompt, word_limit) VALUES (gen_random_uuid(), (SELECT id FROM colleges WHERE full_name = 'University of Notre Dame'), '3. Describe a time when you advocated for something you believed in and influenced others through thoughtful discourse to promote a deeper understanding of a difficult situation.', 150);
-- Supplemental Essay 4 for University of Notre Dame
INSERT INTO supplemental_essays (id, college_id, prompt, word_limit) VALUES (gen_random_uuid(), (SELECT id FROM colleges WHERE full_name = 'University of Notre Dame'), '1. Everyone has different priorities when considering their higher education options and building their college or university list. Tell us about your “non-negotiable” factor(s) when searching for your future college home.', 50);
-- Supplemental Essay 5 for University of Notre Dame
INSERT INTO supplemental_essays (id, college_id, prompt, word_limit) VALUES (gen_random_uuid(), (SELECT id FROM colleges WHERE full_name = 'University of Notre Dame'), '2. What brings you joy?', 50);
-- Supplemental Essay 6 for University of Notre Dame
INSERT INTO supplemental_essays (id, college_id, prompt, word_limit) VALUES (gen_random_uuid(), (SELECT id FROM colleges WHERE full_name = 'University of Notre Dame'), '3. What is worth fighting for?', 50);
-- Supplemental Essay 7 for University of Notre Dame
INSERT INTO supplemental_essays (id, college_id, prompt, word_limit) VALUES (gen_random_uuid(), (SELECT id FROM colleges WHERE full_name = 'University of Notre Dame'), '4. What is something that genuinely interests you, and how does this tie to the academic area you hope to study at Notre Dame?', 50);
-- Supplemental Essay 8 for University of Notre Dame
INSERT INTO supplemental_essays (id, college_id, prompt, word_limit) VALUES (gen_random_uuid(), (SELECT id FROM colleges WHERE full_name = 'University of Notre Dame'), '5. How does faith influence the decisions you make?', 50);
