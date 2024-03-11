INSERT INTO colleges (full_name, short_name, kebab_name, location, setting, campus_size, gen_ranking, acceptance_rate, num_students, base_cost, cost_after_aid, privacy, sat_25th_percentile, sat_50th_percentile, sat_75th_percentile, act_25th_percentile, act_50th_percentile, act_75th_percentile) VALUES ('Purdue University', 'Purdue', 'purdue', 'West Lafayette, IN', 'City', 2468, 51, 50, 37949, 28794, 9127, 'Public', 1210, 1330, 1450, 27, 31, 34);
-- Deadline 1 for Purdue University
INSERT INTO deadlines (id, college_id, decision_type, date, special_name, financial_aid_deadline) VALUES (gen_random_uuid(), (SELECT id FROM colleges WHERE full_name = 'Purdue University'), 'regularDecision', '2024-01-16T00:00:00.000Z', 'Regular Decision', '2024-03-16T00:00:00.000Z');
-- Deadline 2 for Purdue University
INSERT INTO deadlines (id, college_id, decision_type, date, special_name, financial_aid_deadline) VALUES (gen_random_uuid(), (SELECT id FROM colleges WHERE full_name = 'Purdue University'), 'earlyAction', '2023-11-02T00:00:00.000Z', 'Early Action', '2023-12-16T00:00:00.000Z');
-- Supplemental Essay 1 for Purdue University
INSERT INTO supplemental_essays (id, college_id, prompt, word_limit) VALUES (gen_random_uuid(), (SELECT id FROM colleges WHERE full_name = 'Purdue University'), 'How will opportunities at Purdue support your interests, both in and out of the classroom? (Respond in 250 words or fewer.)', 250);
-- Supplemental Essay 2 for Purdue University
INSERT INTO supplemental_essays (id, college_id, prompt, word_limit) VALUES (gen_random_uuid(), (SELECT id FROM colleges WHERE full_name = 'Purdue University'), 'Briefly discuss your reasons for pursuing the major you have selected. (Respond in 250 words or fewer.)', 250);
