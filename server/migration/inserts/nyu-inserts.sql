INSERT INTO colleges (full_name, short_name, kebab_name, location, setting, campus_size, gen_ranking, acceptance_rate, num_students, base_cost, cost_after_aid, privacy, sat_25th_percentile, sat_50th_percentile, sat_75th_percentile, act_25th_percentile, act_50th_percentile, act_75th_percentile) VALUES ('New York University', 'NYU', 'nyu', 'New York, NY', 'Urban', 230, 25, 13, 28772, 58168, 38569, 'Private', 1470, 1520, 1560, 33, 34, 35);
-- Deadline 1 for New York University
INSERT INTO deadlines (id, college_id, decision_type, date, special_name, financial_aid_deadline) VALUES (gen_random_uuid(), (SELECT id FROM colleges WHERE full_name = 'New York University'), 'regularDecision', '2024-01-06T00:00:00.000Z', 'Regular Decision', '2024-02-21T00:00:00.000Z');
-- Deadline 2 for New York University
INSERT INTO deadlines (id, college_id, decision_type, date, special_name, financial_aid_deadline) VALUES (gen_random_uuid(), (SELECT id FROM colleges WHERE full_name = 'New York University'), 'earlyDecision', '2023-11-02T00:00:00.000Z', 'Early Decision I', '2023-11-16T00:00:00.000Z');
-- Deadline 3 for New York University
INSERT INTO deadlines (id, college_id, decision_type, date, special_name, financial_aid_deadline) VALUES (gen_random_uuid(), (SELECT id FROM colleges WHERE full_name = 'New York University'), 'earlyDecision2', '2024-01-02T00:00:00.000Z', 'Early Decision II', '2024-01-16T00:00:00.000Z');
-- Supplemental Essay 1 for New York University
INSERT INTO supplemental_essays (id, college_id, prompt, word_limit) VALUES (gen_random_uuid(), (SELECT id FROM colleges WHERE full_name = 'New York University'), '“We’re used to people telling us there are no solutions, and then creating our own. So we did what we do best. We reached out to each other, and to our allies, and we mobilized across communities to make change, to benefit and include everyone in society.” Judith Heuman, 2022 NYU Commencement Address', 250);
-- Supplemental Essay 2 for New York University
INSERT INTO supplemental_essays (id, college_id, prompt, word_limit) VALUES (gen_random_uuid(), (SELECT id FROM colleges WHERE full_name = 'New York University'), '“I encourage your discomfort, that you must contribute, that you must make your voice heard. That is the essence of good citizenship." Sherilynn Ifill, 2015 NYU Commencement Address', 250);
-- Supplemental Essay 3 for New York University
INSERT INTO supplemental_essays (id, college_id, prompt, word_limit) VALUES (gen_random_uuid(), (SELECT id FROM colleges WHERE full_name = 'New York University'), '“If you know how to fly but you never knew how to walk, wouldn’t that be sad?” Lang Lang, 2015 NYU Honorary Degree Recipient', 250);
-- Supplemental Essay 4 for New York University
INSERT INTO supplemental_essays (id, college_id, prompt, word_limit) VALUES (gen_random_uuid(), (SELECT id FROM colleges WHERE full_name = 'New York University'), '"You have the right to want things and to want things to change." Sanna Marin, Former Prime Minister of Finland, 2023 NYU Commencement Address', 250);
-- Supplemental Essay 5 for New York University
INSERT INTO supplemental_essays (id, college_id, prompt, word_limit) VALUES (gen_random_uuid(), (SELECT id FROM colleges WHERE full_name = 'New York University'), '"It''s hard to fight when the fight ain''t fair.” Taylor Swift, Change, Released 2008, 2022 NYU Commencement Speaker', 250);
-- Supplemental Essay 6 for New York University
INSERT INTO supplemental_essays (id, college_id, prompt, word_limit) VALUES (gen_random_uuid(), (SELECT id FROM colleges WHERE full_name = 'New York University'), 'Share a short quote and person not on this list, and why the quote inspires you.', 250);
